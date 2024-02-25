// Enum para el estado de la suscripción
enum SubscriptionStatus {
  Active = 'Activa',
  Inactive = 'Inactiva',
  Expired = 'Expirada',
}

enum PlandIds {
  Active = 'Activa',
  Inactive = 'Inactiva',
  Expired = 'Expirada',
}

// Enum para los roles de usuario
enum UserRole {
  Admin = 'Administrador',
  User = 'Usuario',
  Recruiter = 'Reclutador',
}

enum Views {
  RecruiterMenu = 'Proyectos',
  ApplicantMenu = 'Habilidades',
  AdminMenu = 'Administrador',
  CV = 'CV',
  Profile = 'Perfil',
  RecruiterDashboard = 'RecruiterDashboard',
  ApplicantDashboard = 'ApplicantDashboard',
  AdminDashboard = 'AdminDashboard',
  NotFound = '404',
}
export default {
  SubscriptionStatus,
  UserRole,
  Views,
};
