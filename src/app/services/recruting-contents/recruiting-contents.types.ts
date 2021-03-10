export interface CompanyResponseModel {
  id: string,
  name: string,
  company: string,
  description: string,
  latitude: number,
  longitude: number,
  imageUrl: string,
  tags: Array<string>
}
