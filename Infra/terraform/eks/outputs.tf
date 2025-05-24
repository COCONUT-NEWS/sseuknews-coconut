output "eks" {
  value = aws_eks_cluster.this
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

output "node_iam_role_arn" {
    value = aws_iam_role.node
}
