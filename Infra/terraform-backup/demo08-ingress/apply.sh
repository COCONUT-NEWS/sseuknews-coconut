#!/bin/bash

# EKS 클러스터만 먼저 apply
terraform apply -target=module.eks-cluster --auto-approve

# EKS 리소스가 state에 생성될 때까지 기다림
while true; do
    if terraform state list | grep -q "module.eks_cluster"; then
        echo "EKS 리소스가 생성되었습니다. 루프를 종료합니다."
        break
    fi
    echo "EKS 리소스를 찾을 수 없습니다. 20초 후 재시도합니다..."
    sleep 20
done

export KUBE_HOST=$(terraform output -raw cluster_endpoint)
export KUBE_CA=$(terraform output -raw cluster_ca_certificate)
export KUBE_TOKEN=$(aws eks get-token --cluster-name $(terraform output -raw cluster_name) --query 'status.token' --output text) 

terraform apply --auto-approve