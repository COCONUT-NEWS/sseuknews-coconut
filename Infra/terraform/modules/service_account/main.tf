resource "kubernetes_service_account" "example"{
  metadata{
    labels = var.sa_labels
    name = var.sa_name
    namespace = var.sa_namespace
    annotations = var.sa_annotations
  }
}