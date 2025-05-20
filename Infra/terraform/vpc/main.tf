#vpc새성성
resource "aws_vpc" "eks_vpc" {
  cidr_block = "172.16.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = {
    Name = "eks_vpc"
  }
}

# Public Subnet1 (2개 AZ)
resource "aws_subnet" "public_subnet_a" {
  vpc_id                  = aws_vpc.eks_vpc.id
  cidr_block              = "172.16.1.0/24"
  availability_zone       = "ap-northeast-1a"
  map_public_ip_on_launch = true
  tags = {
    Name = "public_subnet_a"
  }
  depends_on = [ aws_vpc.eks_vpc ]
}

# Public Subnet2 (2개 AZ)
resource "aws_subnet" "public_subnet_b" {
  vpc_id                  = aws_vpc.eks_vpc.id
  cidr_block              = "172.16.2.0/24"
  availability_zone       = "ap-northeast-1c"
  map_public_ip_on_launch = true
  tags = {
    Name = "public_subnet_b"
  }
  depends_on = [ aws_vpc.eks_vpc ]
}

# Private Subnet1 (2개 AZ)
resource "aws_subnet" "private_subnet_a" {
  vpc_id            = aws_vpc.eks_vpc.id
  cidr_block        = "172.16.3.0/24"
  availability_zone = "ap-northeast-1a"
  tags = {
    Name = "private_subnet_a"
  }
  depends_on = [ aws_vpc.eks_vpc ]
}

# Private Subnet2 (2개 AZ)
resource "aws_subnet" "private_subnet_b" {
  vpc_id            = aws_vpc.eks_vpc.id
  cidr_block        = "172.16.4.0/24"
  availability_zone = "ap-northeast-1c"
  tags = {
    Name = "private_subnet_b"
  }
  depends_on = [ aws_vpc.eks_vpc ]
}

# Private Subnet3 (2개 AZ)
resource "aws_subnet" "private_subnet_c" {
  vpc_id            = aws_vpc.eks_vpc.id
  cidr_block        = "172.16.5.0/24"
  availability_zone = "ap-northeast-1a"
  tags = {
    Name = "private_subnet_c"
  }
  depends_on = [ aws_vpc.eks_vpc ]
}

# Private Subnet4 (2개 AZ)
resource "aws_subnet" "private_subnet_d" {
  vpc_id            = aws_vpc.eks_vpc.id
  cidr_block        = "172.16.6.0/24"
  availability_zone = "ap-northeast-1c"
  tags = {
    Name = "private_subnet_d"
  }
  depends_on = [ aws_vpc.eks_vpc ]
}



# 인터넷 게이트웨이 생성성
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.eks_vpc.id
  tags = {
    Name = "eks-igw"
  }
  depends_on = [ aws_vpc.eks_vpc ]
}

# Nat를 위한 동적IP 할당 (AZ a)
resource "aws_eip" "nat_eip_a" {
  domain = "vpc"
}
# Nat를 위한 동적IP 할당 (AZ c)
resource "aws_eip" "nat_eip_b" {
  domain = "vpc"
}


# NAT Gateway for public_subnet_a
resource "aws_nat_gateway" "eks_ngw_a" {
  allocation_id = aws_eip.nat_eip_a.id
  subnet_id     = aws_subnet.public_subnet_a.id
  depends_on = [
                aws_internet_gateway.igw, 
                aws_eip.nat_eip_a,
                aws_subnet.private_subnet_a
                ]

  tags = {
    Name = "eks_ngw_a"
  }
}

# NAT Gateway for public_subnet_b
resource "aws_nat_gateway" "eks_ngw_b" {
  allocation_id = aws_eip.nat_eip_b.id
  subnet_id     = aws_subnet.public_subnet_b.id
  depends_on = [
                aws_internet_gateway.igw, 
                aws_eip.nat_eip_b,
                aws_subnet.public_subnet_b
                ]

  tags = {
    Name = "eks_ngw_b"
  }
}


# 인터넷 게이트웨이를 통한 라우팅 테이블 생성성
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.eks_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "eks_public_rt"
  }
  depends_on = [ aws_vpc.eks_vpc ]
}

# 퍼블릭 서브넷a 에 라우팅 테이블 연결
resource "aws_route_table_association" "public_assoc_a" {
  subnet_id      = aws_subnet.public_subnet_a.id
  route_table_id = aws_route_table.public_rt.id
  depends_on = [ aws_subnet.public_subnet_a ]
}

# 퍼블릭 서브넷b 에 라우팅 테이블 연결
resource "aws_route_table_association" "public_assoc_b" {
  subnet_id      = aws_subnet.public_subnet_b.id
  route_table_id = aws_route_table.public_rt.id
  depends_on = [ aws_subnet.public_subnet_b ]
}

# NAT 게이트웨이를 통한 라우팅 테이블 생성
resource "aws_route_table" "private_rt_a" {
  vpc_id = aws_vpc.eks_vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.eks_ngw_a.id
  }
  tags = {
    Name = "eks_private_rt_a"
  }
  depends_on = [ aws_vpc.eks_vpc ]
}

# 프라이빗 서브넷 c에 라우팅 테이블 연결
resource "aws_route_table_association" "private_assoc_a" {
  subnet_id      = aws_subnet.private_subnet_c.id
  route_table_id = aws_route_table.private_rt_a.id
  depends_on = [ aws_subnet.private_subnet_c, aws_route_table.private_rt_a ]
}

# NAT 게이트웨이를 통한 라우팅 테이블 생성
resource "aws_route_table" "private_rt_b" {
  vpc_id = aws_vpc.eks_vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.eks_ngw_b.id
  }
  tags = {
    Name = "eks_private_rt_b"
  }
  depends_on = [ aws_vpc.eks_vpc, aws_nat_gateway.eks_ngw_b ]
}
# 프라이빗 서브넷 d에 라우팅 테이블 연결
resource "aws_route_table_association" "private_assoc_b" {
  subnet_id      = aws_subnet.private_subnet_d.id
  route_table_id = aws_route_table.private_rt_b.id
  depends_on = [ aws_route_table.private_rt_b, aws_subnet.private_subnet_d ]
}




