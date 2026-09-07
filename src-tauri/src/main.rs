#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    #[cfg(all(debug_assertions, target_os = "macos"))]
    vertex_lib::ensure_macos_dev_bundle();
    vertex_lib::run()
}
