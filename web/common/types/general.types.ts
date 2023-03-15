import { FC, ReactNode } from "react";

export type FCWithChildren<T = {}> = FC<{ children?: ReactNode } & T>;
