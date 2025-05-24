output "eks_oidc_provider" {
  value = aws_iam_openid_connect_provider.eks_oidc_provider.arn
}