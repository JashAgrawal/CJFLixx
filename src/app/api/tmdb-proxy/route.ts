import { NextRequest, NextResponse } from "next/server";

export const fetchFromAPI = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json() as Promise<T>;
  };

export async function POST(request: NextRequest) {
    const req = await request.json();
    const { url} = req;
    try{
        const data = await fetchFromAPI(url);
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}