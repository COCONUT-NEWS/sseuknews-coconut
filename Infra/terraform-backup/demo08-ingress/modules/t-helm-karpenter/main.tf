###################################karpenter###########################################################


resource "helm_release" "karpenter" {
  name       = "karpenter"
  namespace  = "kube-system"
  repository = "https://charts.karpenter.sh"
  chart      = "karpenter"
  version    = "v0.16.3"  # 최신 버전 확인 후 적용

  set {
    name  = "controller.clusterName"
    value = var.eks_cluster_name
  }

  set {
    name  = "controller.clusterEndpoint"
    value = var.cluster_endpoint
  }

  set {
    name  = "controller.serviceAccount.create"
    value = "false"
  }

  set {
    name  = "controller.serviceAccount.name"
    value = "karpenter"
  }

}

# resource "kubernetes_manifest" "example_nodeclass" {
#   manifest = {
#     apiVersion = "karpenter.k8s.aws/v1beta1"
#     kind       = "EC2NodeClass"
#     metadata = {
#       name = "example-nodeclass"
#     }
#     spec = {
#       amiFamily    = "AL2"
#       subnetSelector = {
#         "karpenter.sh/discovery" = var.eks-cluster-name
#       }
#       securityGroupSelector = {
#         "karpenter.sh/discovery" = var.eks-cluster-name
#       }
#       instanceTypes = ["t3.small"]
#     }
#   }
# }

resource "kubernetes_manifest" "karpenter_provisioner" {
  manifest = {
    apiVersion = "karpenter.sh/v1alpha5"
    kind       = "Provisioner"
    metadata = {
      name = "example-provisioner"
    }
    spec = {
      labels = {
        "karpenter.sh/provisioner-name" = "example-provisioner"
      }
      taints = [
        {
          key    = "karpenter.sh/unschedulable"
          value  = "true"
          effect = "NoSchedule"
        }
        
      ]
          provider = {
        subnetSelector = {
          "karpenter.sh/discovery" = var.eks_cluster_name
        }
        securityGroupSelector = {
          "karpenter.sh/discovery" = var.eks_cluster_name
        }
        instanceProfile = "KarpenterNodeInstanceProfile-${var.eks_cluster_name}"
      }
    }
  }
}