output "vpc_id" {
  value = aws_vpc.eks_vpc.id
}

output "public_subnet_ids" {
  value = [aws_subnet.public_subnet_a.id, aws_subnet.public_subnet_b.id]
}

output "private_subnet_ids" {
  value = [
    aws_subnet.private_subnet_a.id,
    aws_subnet.private_subnet_b.id,
    aws_subnet.private_subnet_c.id,
    aws_subnet.private_subnet_d.id
  ]
}

output "nat_gateway_ids" {
  value = [
    aws_nat_gateway.eks_ngw_a.id,
    aws_nat_gateway.eks_ngw_b.id
  ]
}
