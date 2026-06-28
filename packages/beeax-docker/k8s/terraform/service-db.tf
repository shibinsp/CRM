resource "kubernetes_service" "beeaxcrm_db" {
  metadata {
    name      = "${var.beeaxcrm_app_name}-db"
    namespace = kubernetes_namespace.beeaxcrm.metadata.0.name
  }
  spec {
    selector = {
      app = "${var.beeaxcrm_app_name}-db"
    }
    session_affinity = "ClientIP"
    port {
      port        = 5432
      target_port = 5432
    }

    type = "ClusterIP"
  }
}
