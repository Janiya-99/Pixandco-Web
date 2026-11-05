import Swal from "sweetalert2"

export const adminAlert = Swal.mixin({
  background: "#0c0c10",
  color: "#f4f4f2",
  backdrop: "rgba(0, 0, 0, 0.75)",
  customClass: {
    popup: "admin-glass-panel rounded-xl border border-white/10 shadow-2xl font-[var(--font-poppins)]",
    title: "text-sm font-semibold text-white",
    htmlContainer: "text-xs text-white/60",
    confirmButton: "admin-glass-btn-accent text-[11px] font-medium !bg-red-600 hover:!bg-red-500 !border-red-500 !text-white px-3 py-1 rounded-md",
    cancelButton: "admin-glass-btn text-[11px] font-medium text-white/70 hover:text-white px-3 py-1 rounded-md ml-2",
  },
  buttonsStyling: false,
})

export async function confirmAction({
  title = "Are you sure?",
  text = "This action cannot be undone.",
  confirmText = "Yes, delete",
  cancelText = "Cancel",
  icon = "warning",
}: {
  title?: string
  text?: string
  confirmText?: string
  cancelText?: string
  icon?: "warning" | "info" | "question" | "error" | "success"
}): Promise<boolean> {
  const result = await adminAlert.fire({
    title,
    text,
    icon,
    iconColor: "#ef4444",
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
  })
  return result.isConfirmed
}

