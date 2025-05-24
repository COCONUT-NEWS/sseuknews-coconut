variable "node_iam_role_arn" {
    type = string
  
}

variable "eks" {
    type = string
}

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

variable "karpenter_policy" {
  type        = string
  default     = "./karpenter-policy.json"
}
