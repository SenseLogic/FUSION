export type LocalizedString = string;

export interface PropertyDto {
  id: string;
  title: LocalizedString;
  description?: LocalizedString;
}

export interface HomePageResponseDto {
  favoritePropertyArray: PropertyDto[];
}

export interface PropertiesPageResponseDto {
  propertyArray: PropertyDto[];
}

export interface PropertyPageResponseDto {
  property: PropertyDto | null;
}

