"use server";
export const Url = async (): Promise<string> => {
    const url = process.env.NEXT_PUBLIC_API_GATEWAY;
    return url ?? "";
  }