resource "aws_iam_role" "karpenter" {
  name = "karpenter"
  assume_role_policy = data.aws_iam_policy_document.karpenter_assume_role_policy.json
}

data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

data "template_file" "karpenter_policy" {
  template = file("${path.module}/karpenter_policy.json")

  vars = {
    AWS_PARTITION = "aws",
    AWS_ACCOUNT_ID = data.aws_caller_identity.current.account_id
    CLUSTER_NAME = var.eks_cluster_name
    AWS_REGION = data.aws_region.current.name 
  }
  # 필요한 추가 statement 들도 여기에 계속 작성 가능
}


resource "aws_iam_role" "karpenter_node" {
  name = "KarpenterNodeRole-${var.eks_cluster_name}"
  assume_role_policy = data.aws_iam_policy_document.karpenter_assume_role_policy.json
}



resource "aws_iam_role_policy_attachment" "eks_worker_node" {
  role       = aws_iam_role.karpenter_node.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
}

resource "aws_iam_role_policy_attachment" "eks_cni" {
  role       = aws_iam_role.karpenter_node.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
}

resource "aws_iam_role_policy_attachment" "ecr_readonly" {
  role       = aws_iam_role.karpenter_node.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_iam_role_policy_attachment" "ssm_core" {
  role       = aws_iam_role.karpenter_node.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "kubernetes_service_account" "karpenter" {
  metadata {
    name      = "karpenter"
    namespace = "kube-system"
    labels = {
      "app.kubernetes.io/managed-by" = "Helm"
    }
    annotations = {
       "eks.amazonaws.com/role-arn" = aws_iam_role.karpenter.arn
       "meta.helm.sh/release-name"      = "karpenter"
        "meta.helm.sh/release-namespace" = "kube-system"
    }
  }
  depends_on = [ aws_iam_role_policy_attachment.karpenter]
}


data "aws_iam_policy_document" "karpenter_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]
    effect  = "Allow"

    principals {
      type        = "Federated"
      identifiers = [var.eks_oidc_provider]
    }

    condition {
      test     = "StringEquals"
      variable = "${var.oidc_url_without_https}:sub"
      values   = ["system:serviceaccount:kube-system:karpenter"]
    }
  }
}


resource "aws_iam_policy" "karpenter_policy" {
  name        = "KarpenterPolicy-${var.eks_cluster_name}"
  description = "IAM policy for Karpenter to manage EC2 instances and EKS cluster."
  policy      = data.template_file.karpenter_policy.rendered  # 템플릿 렌더링된 정책 사용
}

# Karpenter IAM 역할에 정책 연결
resource "aws_iam_role_policy_attachment" "karpenter" {
  role       = aws_iam_role.karpenter.name
  policy_arn = aws_iam_policy.karpenter_policy.arn  # 생성된 정책 ARN을 사용
}









