
variable "cluster-name"{
  type = string
}

variable "ng-name"{
  type = string
}

variable "ng-role_arn"{
  type = string
}


variable "subnet-id"{
  type = list(string)
}


variable "cluster_version" {
  type        = string
  default     = "1.25"
  description = "EKS 클러스터 Kubernetes 버전 (예: 1.25)"
}
variable "instance_type" {
  type        = string
  description = "EKS 노드 그룹에 사용할 EC2 인스턴스 타입(e.g., t3.medium)"
  default     = "t3.medium"
}