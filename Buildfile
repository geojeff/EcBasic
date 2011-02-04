# ===========================================================================
# Project:   EcBasic
# ===========================================================================

config :'Thoth-SC', :required => [:sproutcore]
config :scui, :required => [:sproutcore, :'scui/drawing', :'scui/linkit']

# SPECIAL FRAMEWORKS AND THEMES
# These do not require any of the built-in SproutCore frameworks
%w(testing debug).each do |target_name|
  config target_name,
    :required => [], :test_required => [], :debug_required => []
end

config :ecbasic, :required => [:sproutcore, :ki, :scui, :'Thoth-SC']

# Uncomment this line when running with Thoth/XHRPollingDataSource (not needed for WebsocketsDataSource)
proxy '/thoth', :to => 'localhost:8080'
#proxy '/upload', :to => 'localhost:13532'
