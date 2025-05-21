output "eks" {
  value = aws_eks_cluster.this.arn
}

output "eks_name" {
  value = aws_eks_cluster.this.name
}

output "eks_endpoint" {
  value = aws_eks_cluster.this.endpoint
}

output "eks_identity" {
  value = aws_eks_cluster.this.identity
}


### 추가 k8s version###
output "eks_version" {
  value = aws_eks_cluster.this.version
}