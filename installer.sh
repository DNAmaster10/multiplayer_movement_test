while [1==1]
do
  sudo mkdir /var/www/temp
  cd /var/www/temp
  sudo git clone https://github.com/DNAmaster10/multiplayer_movement_test.git
  cd ../
  sudo rm -dr /var/www/html
  sudo mkdir /var/www/html
  sudo chown www-data:www-data /var/www/html
  sudo chmod 770 /var/www/html
  sudo cp -r /var/www/temp/multiplayer_movement_test /var/www/html
  sudo rm -r -r /var/www/temp
  echo -n "Press enter to update site"
  read result
done
