package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

var Port = ":8080"

func main() {

	http.HandleFunc("/", ServeFiles)
	fmt.Println("Serving @ : ", "http://127.0.0.1"+Port)
	log.Fatal(http.ListenAndServe(Port, nil))
}

func ServeFiles(w http.ResponseWriter, r *http.Request) {

	// get users IP
	var userIP string
	if len(r.Header.Get("CF-Connecting-IP")) > 1 {
		userIP = r.Header.Get("CF-Connecting-IP")
	} else if len(r.Header.Get("X-Forwarded-For")) > 1 {
		userIP = r.Header.Get("X-Forwarded-For")
	} else if len(r.Header.Get("X-Real-IP")) > 1 {
		userIP = r.Header.Get("X-Real-IP")
	} else {
		userIP = r.RemoteAddr
		fmt.Printf("userIP: %s", userIP)
		/*
			if strings.Contains(userIP, ":") {
				fmt.Println(net.ParseIP(strings.Split(userIP, ":")[0]))
			} else {
				fmt.Println(net.ParseIP(userIP))
			}
		*/
	}

	switch r.Method {

	case "GET":

		path := r.URL.Path

		fmt.Println(path)

		if path == "/" {

			path = "./static/index.html"
		} else {

			path = "." + path
		}

		http.ServeFile(w, r, path)

	case "POST":

		r.ParseMultipartForm(0)
		message := r.FormValue("message")

		fmt.Println("----------------------------------")
		fmt.Println("Message from Client: ", message)
		// respond to client's request
		fmt.Fprintf(w, "API POST Recieved")

		f, err := os.OpenFile("logfile", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
		if err != nil {
			log.Fatalf("error opening file: %v", err)
		}
		defer f.Close()

		log.SetOutput(f)
		log.Println(userIP + " " + message)

		//time.Sleep(3 * time.Second)

	default:
		fmt.Fprintf(w, "Request type other than GET or POSt not supported")

	}
}
