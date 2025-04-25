//dto(Data Transfer Object) is a structure !
export interface todo {
  id: string,
  title: string,
  description: string,
  status: "complete" | "ongoing"
}