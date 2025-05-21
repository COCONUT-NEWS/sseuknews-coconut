variable "cluster_name" {
    description = "EKS 클러스터 이름"
    type        = string
    default = "coconut_cluster"
}

variable "k8s_cluster_version" {
    description = "EKS 클러스터 버전"
    type        = string
    default = "1.32"
}


variable "public_access_cidrs" {
    description = "EKS 클러스터 퍼블릭 엑세스 CIDR"
    type        = list(string)
    default = [ "0.0.0.0/0" ]
}



variable "eks_cluster_role_policys" {
    description = "eks cluster role policy arns"
    type = list(object({
        name= string
        arn = string
    }))
    default = [
        {
            name = "AmazonEKSClusterPolicy"
            arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
        },
        {
            name = "AmazonEKSVPCResourceController"
            arn = "arn:aws:iam::aws:policy/AmazonEKSVPCResourceController"
        }
    ]
}

variable "node_role_policys" {
    description = "node role policy arns"
    type = list(object({
        name= string
        arn = string
    }))
    default = [
        {
            name = "AmazonEKSWorkerNodePolicy"
            arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
        },
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


variable "node_specs" {
    description = "node group specs for eks cluster"
    type = list(object({
        name = string
        instance_types = list(string)
        volume_size = number
        desired_size = number
        min_size = number
        max_size = number
    }))
    default = [
        {
            name = "t3.large"
            instance_types = ["t3.large"]
            volume_size = 50
            desired_size = 2
            min_size = 2
            max_size = 4
        }
    ]
}

variable "addons" {
  type = list(object({
    name = string
    version = optional(string)
  }))
    default = [
        {
        name = "kube-proxy"
        },
        {
        name = "vpc-cni"
        },
        {
        name = "coredns"
        },
        {
        name = "aws-ebs-csi-driver"
        }
    ]
}
variable "subnet_ids" {
    type = list(string)
}
variable "vpc_id" {
    type = string
}

<<<<<<< HEAD
variable "sg" {
    type = string
}

# variable "lunch_template" {
#     type = string
# }

# variable "security_group" {
#     type = string
# }
=======
variable "lunch_template" {
    type = string
}

variable "security_group" {
    type = string
}
>>>>>>> main
