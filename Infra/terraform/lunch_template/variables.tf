variable "server_port" {
    default = 80
}

variable "vpc_id" {
  type = string
}

variable "private_subnet_ids" {
  type = list(string)
}