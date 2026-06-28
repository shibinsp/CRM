resource "kubernetes_service" "beeaxcrm_redis" {
  metadata {
    name      = "${var.beeaxcrm_app_name}-redis"
    namespace = kubernetes_namespace.beeaxcrm.metadata.0.name
  }
  spec {
    selector = {
      app = "${var.beeaxcrm_app_name}-redis"
    }
    session_affinity = "ClientIP"
    port {
      port        = 6379
      target_port = 6379
    }

    type = "ClusterIP"
  }
}
