require 'bundler/setup'
Bundler.require

require 'sinatra-websocket'

set :environment, :production

set :server, 'thin'
set :sockets, []

get '/' do
  erb :index
end

get '/websocket' do
  if request.websocket? then
    request.websocket do |ws|
      ws.onopen do
        settings.sockets << ws
      end
      ws.onmessage do |msg|
	## どこから送られてきたか調べる
	settings.sockets.each_with_index do |s, i|	
	  if ws.object_id.to_s == s.object_id.to_s
             @order = i
	  end
	end
	## メッセージのそ送信
        settings.sockets.each do |s|
          s.send(@order.to_s + ',' + msg)
        end
      end
      ws.onclose do
        settings.sockets.delete(ws)
      end
    end
  end
end
