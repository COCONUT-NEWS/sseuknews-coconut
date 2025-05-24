
resource "aws_eks_node_group" "example" {
  cluster_name    = var.cluster-name
  node_group_name = var.ng-name
  node_role_arn   = var.ng-role_arn
  subnet_ids      = var.subnet-id

  scaling_config {
    desired_size = 1
    max_size     = 2
    min_size     = 1
  }

  ami_type       = "AL2_x86_64"
  instance_types = [var.instance_type]
    labels = {
    "karpenter.sh/provisioner-name" = "example-provisioner"
    }

    tags = {"karpenter.sh/discovery" = var.cluster-name}
  }
