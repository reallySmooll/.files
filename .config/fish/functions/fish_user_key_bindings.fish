function fish_user_key_bindings
    bind ! bind_bang
    bind '$' bind_dollar
    bind \e\[Z forward-char

    fzf_configure_bindings --processes=\cp
    fzf_configure_bindings --directory=\e\t
end
