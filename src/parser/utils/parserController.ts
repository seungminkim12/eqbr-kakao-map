// export const parserController = async <T>(func: () => Promise<T> | any) => {
//   try {
//     return await func();
//   } catch (e: any) {
//     throw e;
//   }
// };

export async function parserController<T>(func: () => Promise<T> | any) {
  // ): Promise<T> | any {
  try {
    return await func();
  } catch (e: any) {
    throw e;
  }
}
