export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      name : 'Giám sát người dùng',
      url : '/control-user',
      icon :'icon-pie-chart'
    },
    {
      name : 'Giám sát doanh thu',
      url : '',
      icon :'icon-calculator',
      children : [
        {
          name : 'Theo quốc gia',
          url :'/control-revenue-countries',
          icon : 'icon-cursor'
        },
        {
          name : 'Theo hệ điều hành',
          url :'control-revenue-os',
          icon : 'icon-cursor'
        },
      ]
    },
    {
      name : 'Top 20 quốc gia đăng ký nhiều nhất',
      url : 'top-register',
      icon :'icon-puzzle'
    },
    
    {
      name : 'Vàng',
      url : 'gold',
      icon :'icon-star'
    },
    {
      name : 'Trận đấu',
      url : 'match',
      icon :'icon-drop'
    },

   ],
};
