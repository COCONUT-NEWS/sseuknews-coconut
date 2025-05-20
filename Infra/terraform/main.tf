module "template" {
  source = "./lunch_template"
}

module "vpc" {
  source = "./vpc"
}