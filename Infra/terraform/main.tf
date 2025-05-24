
module "vpc" {
  source = "./vpc"
}

module "eks" {
  source = "./eks"
  subnet_ids = module.vpc.private_subnet_ids
  vpc_id = module.vpc.vpc_id
  sg = module.sg.aws_security_group
  depends_on = [ module.vpc]
}

module "sg" {
  source = "./sg"
  vpc_id = module.vpc.vpc_id
}  

module "karpenter"{
  source = "./karpenter"
  eks = module.eks
  node_iam_role_arn = node_iam_role_arn
}