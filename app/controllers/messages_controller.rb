class MessagesController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    message = {
      username: params[:username],
      content: params[:content]
    }

    Pusher.trigger('chatroom', 'new-message', message)

    head :ok
  end
end