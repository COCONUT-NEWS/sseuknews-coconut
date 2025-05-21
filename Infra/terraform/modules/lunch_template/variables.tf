variable "server_port" {
    default = 80
}
variable "vpc_id" {
    type        = string
    description = "기존에 생성된 VPC ID"
}

variable "private_subnet_ids" {
    type        = list(string)
    description = "기존 VPC의 프라이빗 서브넷 ID 리스트"
}