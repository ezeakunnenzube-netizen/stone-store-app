---
name: Overlapping max-width media queries
description: Why two `@media (max-width: ...)` blocks with different thresholds can silently fight each other, and how to avoid it.
---

When a stylesheet has multiple `@media (max-width: N)` blocks targeting different breakpoints (e.g. one for phones, one for tablets), every block whose condition is true applies simultaneously — a viewport of 390px matches both a `max-width: 600px` block and a `max-width: 800px` block. CSS then resolves conflicting declarations by source order, not by which breakpoint is "more specific" to the current width. If the tablet block appears later in the file, its rules win on phones too, silently undoing the phone-specific layout.

**Why:** This caused a real bug in a product grid: a `max-width: 800px` "iPad" block placed after a `max-width: 600px` "phone" block overrode the phone's single-column/square-card layout with the tablet's multi-column grid on actual phones.

**How to apply:** When adding a new breakpoint block, check whether its range overlaps an existing one. If so, scope it with an explicit range, e.g. `@media (min-width: 601px) and (max-width: 800px)`, instead of a bare `max-width`, so breakpoints partition the viewport instead of stacking.
