interface VIsForbiddenParams {
  Authorization: string
}

export default interface VApi {
  apiGetWxPayInfo(code: string): Promise<object>,
  apiGetShoppingNum(): Promise<object>,
  apiIsForbidden(params: VIsForbiddenParams): Promise<object>
}
