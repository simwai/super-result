from src.super_result import as_result, is_err


@as_result
def safe_div(a: int, b: int) -> int:
  return a // b


res = safe_div(10, 0)
if is_err(res):
  print(res.full_stack)  # Full traceback

res = safe_div(10, 2)
if is_err(res):
  print(res.full_stack)  # Full traceback
else:
  print(res.value)


res2 = safe_div(10, 5)
if (is_err(res2)):
  print(res2.stack)
  print(res2.full_stack)