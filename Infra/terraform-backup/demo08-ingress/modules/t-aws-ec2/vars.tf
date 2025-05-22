variable "ami-ubuntu-id" {
  type = string
  default = "ami-037843ed9009f7d41" #ubuntu 22.04
}

variable "ec2-subnet" {
  type = string
}

variable "ec2-az" {
  type = string
}

variable "ec2-key_name" {
  type = string
}

variable "ec2-usage" {
  type = string 
}

variable "ec2-sg" {
  type = list(string)
}
