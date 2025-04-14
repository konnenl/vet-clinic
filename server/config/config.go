package config

import(
	_"log"
	"os"
	"github.com/joho/godotenv"
)

type Config struct{
	ServerPort string
}

func LoadConfig() (*Config, error){
	err := godotenv.Load("../.env")
	if err != nil{
		return nil, err
	}

	return &Config{
		ServerPort: getEnv("SERVER_PORT", ":8080"),
	}, nil
}

func getEnv(key, defaultValue string) string{
	value, exist := os.LookupEnv(key)
	if exist{
		return value
	}
	return defaultValue
}