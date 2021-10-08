import { add } from "./add";

test("Index add fun", () => {
  const ret = add(1, 2)
  console.log(ret)
  expect(ret).toBe(3)
})
