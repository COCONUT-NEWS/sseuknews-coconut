resource "aws_eks_cluster" "example" {
  name     = var.cluster-name
  role_arn = var.cluster-role_arn
  
  vpc_config {
    subnet_ids 		= var.cluster-subnet_ids
    security_group_ids  = var.cluster-sg
  }
  # access_config {
  #   authentication_mode = "API_AND_CONFIG_MAP"
  #   bootstrap_cluster_creator_admin_permissions = true
  # }
}
data "tls_certificate" "oidc_cert" {
  url = "${aws_eks_cluster.example.identity[0].oidc[0].issuer}/keys"
}

# resource "terraform_data" "update_kubeconfig" {
#   provisioner "local-exec" {
#     command = "aws eks update-kubeconfig --region ap-northeast-1 --name ${var.cluster-name}"
#   }

#   depends_on = [aws_eks_cluster.example]
# }
