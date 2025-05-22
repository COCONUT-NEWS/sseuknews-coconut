data "aws_eks_cluster" "cluster" {
  name = module.eks-cluster.cluster-name

  # module.eks-cluster 리소스가 생성 완료된 뒤에만 조회
  depends_on = [
    module.eks-cluster
  ]
}

data "aws_eks_cluster_auth" "cluster_auth" {
  name = module.eks-cluster.cluster-name

  # 클러스터 정보 조회(data.aws_eks_cluster.cluster) 이후에만 토큰 생성
  depends_on = [
    data.aws_eks_cluster.cluster
  ]
}

provider "aws" {
  access_key = var.AWS_ACCESS_KEY
  secret_key = var.AWS_SECRET_KEY
  region     = var.AWS_REGION
  #token      = var.AWS_SESSION_TOKEN
}

provider "kubernetes" {
  config_path = "~/.kube/config"
  
  #Credentials config:
  host                   = data.aws_eks_cluster.cluster.endpoint
  token                  = data.aws_eks_cluster_auth.cluster_auth.token

  cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority[0].data)
}

provider "helm" {
  kubernetes {
    #config_path = "~/.kube/config"
  
    #Credentials config:
    host                   = data.aws_eks_cluster.cluster.endpoint
    token                  = data.aws_eks_cluster_auth.cluster_auth.token
    cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority[0].data)
  }
}

