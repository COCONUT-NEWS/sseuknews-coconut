data "aws_iam_policy_document" "karpenter_json" {
  override_json = file(var.karpenter_policy)
}

resource "helm_release" "karpenter" {
  name       = "karpenter"
  namespace  = "kube-system"
  repository = "https://charts.karpenter.sh"
  chart      = "karpenter"
  version    = "v1.4.0"  # 최신 버전 확인 후 적용

  set {
    name  = "controller.clusterName"
    value = var.eks.name
  }

  set {
    name  = "controller.clusterEndpoint"
    value = var.eks.endpoint
  }

  set {
    name  = "controller.serviceAccount.create"
    value = "false"
  }

  set {
    name  = "controller.serviceAccount.name"
    value = kubernetes_service_account.karpenter.metadata[0].name
  }

  depends_on = [aws_iam_role.karpenter, kubernetes_service_account.karpenter]
}


data "aws_iam_policy_document" "karpenter_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]
    effect  = "Allow"

    principals {
      type        = "Federated"
      identifiers = [aws_iam_oidc_provider.eks_oidc_provider.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "${replace(data.aws_eks_cluster.cluster.identity[0].oidc[0].issuer, "https://", "")}:sub"
      values   = ["system:serviceaccount:kube-system:karpenter"]
    }
  }
}
resource "aws_iam_policy" "karpenter_controller" {
  name   = "KarpenterControllerPolicy"
  policy = data.aws_iam_policy_document.karpenter_json.json
}

resource "aws_iam_role_policy_attachment" "karpenter" {
    for_each = { for policy in var.karpenter_role_policys : policy.name => policy }
  role       = aws_iam_role.karpenter.name
  policy_arn = each.value.arn
}


provider "aws" {
  region = "ap-northeast-1"
}

data "aws_eks_cluster" "cluster" {
  name = var.eks.name
}

data "aws_eks_cluster_auth" "cluster" {
  name = var.eks.name
}

resource "aws_iam_oidc_provider" "eks_oidc_provider" {
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [data.aws_eks_cluster.cluster.certificate_authority[0].data]
  url             = data.aws_eks_cluster.cluster.identity[0].oidc[0].issuer
}

resource "kubernetes_service_account" "karpenter" {
  metadata {
    name      = "karpenter"
    namespace = "kube-system"
    annotations = {
      "eks.amazonaws.com/role-arn" = aws_iam_role.karpenter.arn
    }
  }
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.cluster.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority[0].data)
  token                  = data.aws_eks_cluster_auth.cluster.token
}

