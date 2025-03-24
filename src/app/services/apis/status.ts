export enum ApiStatus {
  OK = 0,

  ADMIN_SUPERUSER_EXISTS = 1000,
  ADMIN_USER_NOT_FOUND = 1001,
  ADMIN_USER_PASSWORD_INCORRECT = 1002,
  ADMIN_USER_BANNED = 1003,
  ADMIN_CAPTCHA_INCORRECT = 1004,

  ENDPOINT_NOT_FOUND = 1100,
  API_EXISTS = 1101,
  API_NOT_FOUND = 1102,
  PERMISSION_NOT_FOUND = 1103,
  PERMISSION_CODE_DUPLICATED = 1104,
  PERMISSION_PARENT_INVALID = 1105,
}
