function bind_bang
    switch (commandline -t)[-1]
	case "!"
		commandline -t $history[1];
	case "*"
		commandline -i !
   end
end
