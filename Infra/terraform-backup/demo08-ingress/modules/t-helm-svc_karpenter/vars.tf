variable "karpenter_role_policys" {
    description = "karpenter role policy arns"
    type = list(object({
        name= string
        arn = string
    }))
    default = [
        {
            name = "AmazonSSMManagedInstanceCore"
            arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
        },
        {
            name = "AmazonEKS_CNI_Policy"
            arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
        },
        {
            name = "AmazonEC2ContainerRegistryReadOnly"
            arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
        }
    ]
}


variable "oidc_url" {
  type = string
}

variable "oidc_url_without_https" {
  type = string
}


variable "eks_oidc_provider" {
  type = string
}

variable "eks_cluster_name" {
  type = string
}
