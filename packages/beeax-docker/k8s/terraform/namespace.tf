resource "kubernetes_namespace" "beeaxcrm" {
  metadata {
    annotations = {
      name = var.beeaxcrm_namespace
    }

    name = var.beeaxcrm_namespace
  }
}
