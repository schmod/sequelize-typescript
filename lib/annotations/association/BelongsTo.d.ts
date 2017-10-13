/// <reference types="sequelize" />
import { AssociationOptionsBelongsTo } from 'sequelize';
import { ModelClassGetter } from "../../types/ModelClassGetter";
export declare function BelongsTo(relatedClassGetter: ModelClassGetter, foreignKey?: string): Function;
export declare function BelongsTo(relatedClassGetter: ModelClassGetter, options?: AssociationOptionsBelongsTo): Function;
