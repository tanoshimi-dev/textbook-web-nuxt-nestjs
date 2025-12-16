import {
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
  ValidateIf,
} from "class-validator";
import { ShopStatus } from "../entities/shop.entity";

export class CreateShopDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @ValidateIf((o) => o.email !== "" && o.email !== null)
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(ShopStatus)
  status?: ShopStatus;
}
