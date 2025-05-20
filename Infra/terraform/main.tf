
module "vpc" {
  source = "./vpc"
}
module "template" {
  source = "./lunch_template"
  vpc_id = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  depends_on = [ module.vpc ]
}

module "eks" {
  source = "./eks"
  subnet_ids = module.vpc.private_subnet_ids
  vpc_id = module.vpc.vpc_id
  lunch_template = module.template.launch_template
  security_group = module.template.aws_security_group
  depends_on = [ module.template ]
}