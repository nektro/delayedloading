with import <nixpkgs> {};

pkgs.mkShell {
  nativeBuildInputs = with pkgs; [
    nodejs_22
  ];

  hardeningDisable = [ "all" ];

  NIX_LD = lib.fileContents "${stdenv.cc}/nix-support/dynamic-linker";
}
