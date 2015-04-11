class CommandsController < ApplicationController
  def index
    render :layout => false
  end

  def execute
    @command = Command.new

    @command.command_text = params[:command_text]

    @command.save

    respond_to do |format|
      format.js
    end
  end

  private

  def command_params
    params.require(:command).permit(:command_text)
  end
end
