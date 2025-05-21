output "sa_namespace"{
  value = kubernetes_service_account.example.metadata[0].namespace
}
output "sa_name"{
  value = kubernetes_service_account.example.metadata[0].name
}
